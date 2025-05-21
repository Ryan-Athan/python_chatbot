from openai import OpenAI
from fastapi import FastAPI,Form,Request ,WebSocket
from typing import Annotated 

from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

import os
from dotenv import load_dotenv

load_dotenv()


class AIClient:
    def __int__(self,key):
        self.client = OpenAI(api_key=key)

    async def generatetext(self,userinput,chatlogs):
        chatlogs.append({"role":"user","content":userinput})
        fullresponse = ""

        try:
            completion = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                store=False,  
                messages=chatlogs,
                temperature= 0.6,
                stream = True 
            )

            for chunk in completion:
                botresponse = chunk.choices[0].delta.content
                if botresponse:
                    fullresponse += botresponse
                    yield botresponse # yield for instead of sending directly to websocket

            chatlogs.append({"role":"assistant","content":fullresponse})        

        except Exception as err:
            raise RuntimeError(str(err))
        

    async def generateimage(self,userinput):
        try:
            completion = self.client.images.generate(
                model="dall-e-2",
                prompt=userinput,
                size="512x512", 
                n=1
            )

            botresponse = completion.data[0].url
    
            if not botresponse:
                raise ValueError("No image generated")

            return botresponse
            
        except Exception as err:
            raise RuntimeError(str(err))


class Chat:
    def __init__(self):
        self.app = FastAPI()
        self.templates = Jinja2Templates(directory="templates")
        self.client = AIClient(key = os.getenv("OPENAI_API_KEY"))
        self.app.mount('/static',StaticFiles(directory="static"),name="static")
        self.chatlogs = [{
            "role":"system",
            "content":"You are a Python Developer." 
            }]
        self.webroutes()


    def webroutes(self):
        @self.app.get("/",response_class=HTMLResponse)
        async def chatindex(request:Request):
             return self.templates.TemplateResponse(
                "layout.html",{"request":request}
            )
        
        @self.app.websocket("/ws")
        async def chat(websocket: WebSocket):
            await websocket.accept()
            while True:
                userinput = await websocket.receive_text()      
                try:
                    async for content in self.client.generatetext(userinput,self.chatlogs):
                        await websocket.sent_text(content)
                except RuntimeError as err:
                    await websocket.send_text(f"Error : {str(err)}")
                    break  

        
        @self.app.get("/image",response_class=HTMLResponse)
        async def imageindex(request:Request):
            return self.templates.TemplateResponse(
                "image.html",{"request":request}
            )
        
        @self.app.websocket('/image')
        async def image(websocket: WebSocket):
            await websocket.accept()
            while True:
                userinput = await websocket.receive_text()
                try:
                    imageurl = await self.client.generateimage(userinput)
                    await websocket.send_text(imageurl)
                except RecursionError as err:
                    await websocket.send_text(f"Error : {str(err)}")
                    break


chatObj = Chat()
app = chatObj.app

# uvicorn main:app --reload

