import asyncio
import uvicorn

async def main():
    config = uvicorn.Config("natsWrapper:run", port=5000, log_level="info")
    server = uvicorn.Server(config)
    await server.serve()

if __name__ == "__main__":
    asyncio.run(main())
