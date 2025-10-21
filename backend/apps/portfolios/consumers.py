import json

from channels.generic.websocket import AsyncWebsocketConsumer


class PortfolioConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add('portfolios', self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard('portfolios', self.channel_name)

    async def portfolio_created(self, event):
        await self.send(text_data=json.dumps({
            'type': 'portfolio_created',
            'portfolio': event['portfolio']
        }))
