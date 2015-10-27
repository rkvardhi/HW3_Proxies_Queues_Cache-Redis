# HW #3 Proxies, Queues, Cache Fluency

### An expiring cache

######Setting the value to key "newkey1"
![img1](/screenshots/img1.png)
######Getting the value of key "newkey1"
![img2](/screenshots/img2.png)
######Value expired after 10 seconds
![img3](/screenshots/img3.png)

### 5 Recently visited sites
######Below is the screenshot after visiting recent 5 times
![img4](/screenshots/img4.png)

### Cat picture uploads: queue
Uploaded the cat image using curl and storing the image in a queue
```
curl -F "image=@./img/morning.jpg" localhost:3000/upload
```

######Popping image from queue using meow
![img5](/screenshots/img5.png)

### Additional instance running
Instance is running on port 3001
![img6](/screenshots/img6.png)

### Proxy server
Setting up of proxy server using node-http-proxy
######To install : 
```
npm install http-proxy --save
```
Running proxy on port 3002 and it alternatively requests service to instances running on port 3001 and 3002.

##Screencast
