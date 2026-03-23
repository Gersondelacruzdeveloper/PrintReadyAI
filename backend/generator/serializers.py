from rest_framework import serializers

class GenerateSerializer(serializers.Serializer):
    template = serializers.ChoiceField(choices=["cv", "flyer", "trifold"])
    userInfo = serializers.CharField(min_length=10)
    style = serializers.ChoiceField(
        choices=["clean", "modern", "bold"],
        required=False,
        default="clean"
    )