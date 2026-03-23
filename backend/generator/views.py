from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings

from openai import OpenAI

from .serializers import GenerateSerializer
from .prompts import CV_SYSTEM, FLYER_SYSTEM, TRIFOLD_SYSTEM


class GenerateView(APIView):
    def post(self, request):
        serializer = GenerateSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        template = data["template"]
        user_info = data["userInfo"]

        if template == "cv":
            system_prompt = CV_SYSTEM
        elif template == "flyer":
            system_prompt = FLYER_SYSTEM
        else:
            system_prompt = TRIFOLD_SYSTEM

        try:
            client = OpenAI(api_key=settings.OPENAI_API_KEY)

            response = client.responses.create(
                model="gpt-4.1",
                input=[
                    {"role": "system", "content": system_prompt},
                    {
                        "role": "user",
                        "content": f"Generate document using this info:\n\n{user_info}"
                    },
                ],
            )

            html = response.output_text

            return Response({"html": html})

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )