# WIP: Host Of The Year

Work in progress for a simple event planning and chat app. Built in response mostly to being the only friend outside of the iOS group chats, this app seaks to be a simple way to plan events and communicate with friends. This is currently a work in progress and therefore has much left to do.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Install

The project is currently split into two directories, one for the backend and one for the frontend. Each directory is responsible for its own packages and must be started independently.

You need to create a .env file within the loopback directory. Currently the only required variables are listed in the .env.example file.

Once you've cloned or downloaded the repo you must:

```
cd hoty
npm install
```

Then open a new terminal at the project root and:

```
cd hoty-client
npm install
```

Which will install all the necessary dependancies.


Running a development environment is done with:

```
npm start
```

Note this command must be used in both terminals to start up the loopback application as well as the react frontend.

## Built With

-   [LoobBack4](https://loopback.io/doc/en/lb4/)
-   [React](https://reactjs.org/)

## Authors

-   **Luke Cochrane** [MLCochrane](https://github.com/MLCochrane/)

## License

This project is licensed under the MIT License
