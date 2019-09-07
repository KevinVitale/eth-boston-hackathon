FROM python:latest

RUN pip3 install -U nucypher

EXPOSE 10151

CMD ["nucypher", "ursula", "run", "--dev", "--federated-only"]
