output "jenkins_master_ip" {
  value = aws_instance.jenkins_master.public_ip
}

output "node1_ip" {
  value = aws_instance.node1.public_ip
}

output "node2_ip" {
  value = aws_instance.node2.public_ip
}
