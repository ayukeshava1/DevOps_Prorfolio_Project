# DevOps Portfolio Project

## 📌 Description
This project is a full-stack portfolio website built using React (frontend), FastAPI (backend), and PostgreSQL (database). It's designed to showcase my complete DevOps lifecycle skills including CI/CD, Docker, Kubernetes, Jenkins, Terraform, Ansible, and Monitoring via ELK stack.

## 🔧 Technologies Used
- Frontend: React, Tailwind CSS
- Backend: FastAPI, Python
- Database: PostgreSQL
- CI/CD: Jenkins, GitHub, Docker
- Infrastructure: AWS EC2, Terraform, Ansible
- Container Orchestration: Kubernetes
- Monitoring: ELK Stack

## 💻 Technology Stack Summary

Layer	Tool
Version Control	Git (GitHub)
CI/CD	Jenkins
Infra as Code	Terraform
Config Mgmt	Ansible
Containers	Docker
Orchestration	Kubernetes
Monitoring/Logs	ELK Stack (Filebeat, Kibana)
Frontend	React + Tailwind CSS
Backend	FastAPI
DB	PostgreSQL (local or dockerized)
Hosting	AWS Free Tier (EC2)


## CI/CD Pipeline Flow

GitHub (main/dev) ─▶ Jenkins ─▶ Terraform ─▶ Ansible ─▶ Docker ─▶ K8s ─▶ ELK
                                        │
                                        └── Push build info to FastAPI/DB


## 📁 Monorepo Name: devops-portfolio-pipeline
        devops-portfolio-pipeline/
 ├── frontend/
 │   ├── src/
 │   │   └── index.jsx
 │   └── Dockerfile

 ├── backend/
 │   ├── app/
 │   │   └── main.py
 │   └── Dockerfile

 ├── infra/
 │   ├── terraform/
 │   │   ├── main.tf
 │   │   ├── variables.tf
 │   │   └── outputs.tf
 │   └── ansible/
 │       ├── inventory/
 │       │   └── hosts.ini
 │       └── playbooks/
 │           ├── jenkins.yml
 │           ├── docker.yml
 │           └── k8s.yml

 ├── jenkins/
 │   ├── frontend.Jenkinsfile
 │   ├── backend.Jenkinsfile
 │   ├── deploy.Jenkinsfile
 │   └── shared/
 │       └── utils.groovy

 ├── k8s/
 │   ├── frontend-deployment.yaml
 │   ├── backend-deployment.yaml
 │   ├── postgres-deployment.yaml
 │   ├── ingress.yaml
 │   └── namespace.yaml

 ├── monitoring/
 │   └── elk/
 │       ├── docker-compose.yml
 │       └── logstash.conf

 └── dashboard/
    └── components/
        └── CICDStatus.jsx

                             
## 🧪 2. CI/CD Pipeline Strategy — Modular (as you planned 💥)

   Pipeline                            	Jenkinsfile                         	Purpose
  Frontend CI/CD	                frontend.Jenkinsfile	             Build, test, push Docker, deploy FE
  Backend CI/CD	                  backend.Jenkinsfile	               Build, test, push Docker, deploy BE
  Deploy Infra	                  deploy.Jenkinsfile	               Terraform + Ansible + K8s Apply
  Monitoring Setup	              monitoring.Jenkinsfile             Setup ELK and Filebeat on nodes

## ⚙️ Setup Instructions
     1. Clone the repo
     2. Set up Python virtualenv and install backend dependencies
     3. Install frontend packages using npm
     4. Use Docker to containerize the app

## 🚀 Usage
  This project will be deployed using Jenkins pipelines and Kubernetes. The final deployed site includes a `/devops-dashboard` route showing CI/CD pipeline 
  results.


## 🌐 Target Deployment Architecture

                          [Internet Users]
                                 |
                                 ↓
                          [Ingress Controller]
                                 |
                +----------------+-----------------+
                |                                  |
        [React Frontend Service]        [FastAPI Backend Service]
                |                                  |
                +----------------------------------+
                                 |
                        [PostgreSQL Service]


## 🧱 EC2 Infrastructure Plan

  Instance	             Role	                                Specs	                                             Purpose
  EC2-1	          Master Node + Jenkins Server	      Ubuntu, t2.micro (1 vCPU, 1GB RAM)	                Control Plane + Jenkins
  EC2-2	          Worker Node 1	                      Ubuntu, t2.micro	Run workloads
  EC2-3	          Worker Node 2                      	Ubuntu, t2.micro	Run workloads



## 🔩 Kubeadm Kubernetes Architecture

             [ EC2-1: Master + Jenkins ]
                      |
          kube-apiserver, controller-manager, etcd
                      |
         -------------------------------
         |                             |
    [ EC2-2: Worker ]           [ EC2-3: Worker ]
         |                             |
     Pods run here            Pods run here
         |                             |
     [Frontend]                  [Backend, DB]
 

## 🌍 Final Deployment Architecture

          📦 Components:
                1. Frontend (React)
                2. Backend (FastAPI)
                3. PostgreSQL (DB)
                4. Ingress (to expose frontend to internet)


## 🔁 Pipeline Model
        We’ll use 4 pipelines:

                    Pipeline Name                                          	Purpose
                  frontend-build	                              Build React app + push Docker image
                  backend-build	                                Build FastAPI + push Docker image
                  db-setup	                                    Deploy PostgreSQL in cluster
                  deploy-app	                                  Deploy YAMLs for FE/BE/DB + Ingress

## 🧱 K8s Services (Internal + External)

                       Component	         Type	                  Port
                       Frontend	          Ingress	        80 (public access)
                       Backend	          ClusterIP      	8000 (internal)
                       PostgreSQL        	ClusterIP      	5432 (internal)
## 📜 License
MIT License
