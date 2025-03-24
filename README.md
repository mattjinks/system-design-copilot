# AI-Powered System Design Copilot

**Demo**: https://youtu.be/s2vfirCqVfo?si=p6f9v8qMeqfUEhWD

## Description

This project is an AI-powered system design copilot, built to help users learn and create software architectures by offering real-time feedback on design decisions and tradeoffs. It features an interactive web app developed with React, including a chat interface that guides users step-by-step through design choices. Users can construct, visualize, and receive feedback on system design diagrams.

![chat-interface](https://github.com/mattjinks/system-design-copilot/blob/0f8b5e37da9d521b8ae9900ccaf7b1ee687da5aa/Chat%20Interface.png)

![alt-text](https://github.com/mattjinks/system-design-copilot/blob/159f0521012e50236c286211eeeb13e2577a9b4f/Diagram%20Interface.png)

The backend, developed with Go and the Azure OpenAI SDK, uses a chat-stream API to process user queries and stream insightful responses directly to the client, enriching both the learning and design experience.

![arch-diagram](https://github.com/mattjinks/system-design-copilot/blob/0f8b5e37da9d521b8ae9900ccaf7b1ee687da5aa/Architecture%20Diagram.png)

## Technologies Used

- **Microsoft Azure OpenAI**
- **Go**
- **React**
- **TypeScript**
- **Docker**

## Deployment
![alt text](Deployment.png)
The Go API service and React frontend app are stored together in a monorepo on GitHub. The deployment process includes:

- **React Frontend**: Deployed via AWS Amplify.
- **Backend Service**: Deployed as a Docker image using Google Cloud Run.

Both frontend and backend support continuous deployment for streamlined updates.

---

Feel free to contribute or reach out with any feedback or questions!
