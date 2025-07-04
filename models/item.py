class Item:
    def __init__(self, name, image_link, collected):
        self.name = name
        self.image_link = image_link
        self.collected = collected

    def get_item(self):
        return {
            "name": self.name,
            "image": self.image_link,
            "collected": self.collected
        }