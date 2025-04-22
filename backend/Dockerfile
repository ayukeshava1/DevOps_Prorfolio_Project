# FROM python:3.10

# # Create working directory
# WORKDIR /app

# # Copy dependencies and install
# COPY requirements.txt .
# RUN pip install --no-cache-dir -r requirements.txt

# # Copy the FastAPI app
# COPY app/ /app/app

# # Expose FastAPI port
# EXPOSE 8000

# # Run FastAPI app
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]


# Use a specific Python version
FROM python:3.10

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Set the working directory
WORKDIR /app

# Copy and install dependencies
COPY requirements.txt . 
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code into the container
COPY app/ /app

# Expose port 8000 for FastAPI
EXPOSE 8000

# Run the FastAPI app with Uvicorn, optimized for production with multiple workers
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
