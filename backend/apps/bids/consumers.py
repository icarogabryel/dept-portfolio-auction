import json

from channels.generic.websocket import AsyncWebsocketConsumer


class BidConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add('bids', self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard('bids', self.channel_name)

    async def bid_created(self, event):
        await self.send(text_data=json.dumps({
            'type': 'bid_created',
            'bid': event['bid']
        }))

    async def bid_updated(self, event):
        await self.send(text_data=json.dumps({
            'type': 'bid_updated',
            'bid': event['bid']
        }))
