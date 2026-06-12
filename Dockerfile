FROM python:3.14-slim as builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.14-slim
WORKDIR /app
COPY --from=builder /usr/local/lib/python3.14/site-packages/ /usr/local/lib/python3.14/site-packages/
COPY . .
EXPOSE 5000
CMD ["./entrypoint.sh"]
