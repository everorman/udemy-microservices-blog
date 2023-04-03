## Create docker image
> docker image -t [image_name]:[version] . 

## Create kubernete cluster
> kubectl apply -f post.yml

## Get kubernete pods 
> kubectl get pods 

## Run commands inside of pod 
> kubectl exec -it [pod-name] [cmd] 

## Delete pods 
> kubectl delete [pod-name]

## Logs 
>  kubectl logs [pod-name]

## Get deployments
When you create a deployment it creates the pods required, if you deleted for some reason a pod, it will be created by de deployment again. The deployment allow us update de pods version easily. 
> kubectl get deployments 

## Describe deployments 
> kubectl describe [deployment-name]

## Delete deplyments 
> kubectl delete [deployment-name]

## Restart deployments 
> kubectl rollout restart deployment [deployment-name]

## Types services

- Cluster IP, sets a easy-to-remember url to access a pod. Only expose pods in the cluster.
- Node port, makes a pod accessible to outside the cluster. Usually only used for dev purposes.
- Load balancer, makes a pod accessible to outside the cluster, is the correct way to expose a pod to the outside cluster. 
- External name

## Ingress controller 
Provide mechanism to redirect the request to specific pod, is used by the load balancer. 
for install it we need to follow this instructions: https://kubernetes.github.io/ingress-nginx/deploy/#quick-start.
If you have many routes you MUST 
For use regex in our ingress.yml config file, we need to add this in annotation property: 
> nginx.ingress.kubernetes.io/use-regex: 'true'