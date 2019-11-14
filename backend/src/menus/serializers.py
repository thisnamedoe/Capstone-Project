from rest_framework import serializers

class Menu(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    resturant_name = serializers.CharField(max_length=255)

class MenuItem(serializers.Serializer):
	id = serializers.IntegerField(read_only=True)
	name = serializers.CharField(max_length=255, required=True)
	description = serializers.CharField(max_length=255, required=True)
	price = serializers.IntegerField(required=True)
	image = serializers.ImageField(max_length=255, required=True)