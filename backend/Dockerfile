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


FROM python:3.10

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the FastAPI app
COPY app/ /app

# Expose FastAPI port
EXPOSE 8000

# Optimize Uvicorn startup for performance
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
