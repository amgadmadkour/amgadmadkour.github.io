---
title: 'Start Flask on Port 80'
date: 2020-03-02
sitemap: false
permalink: /posts/2020/04/07/start-flask-sudo.html
tags:
  - flask
---

Starting flask as a **sudo** user is required when users need to run on port 80. The following steps will help achieve this process:

First, install **python-dotenv** to enable defining some necessary environment variables:

```code
pip install python-dotenv
```
Then, create a **.flaskenv** file inside the root directory of your application. The file content should include:

```code
FLASK_APP=run.py
FLASK_RUN_HOST=localhost
FLASK_RUN_PORT=80
```

Finally, run the app as follows:

```code
sudo flask run
```

The environment variables will be picked up and will be applied to the flask application. The above command launches flask on port 80.