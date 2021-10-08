# Hotels Compare

This is a mini project to display the aggregation of different hotel results and their prices for different currencies.

## Environment developed in

- node v16.8.0
- npm v7.21.0
- windows 11

## Up and Running

This application was bootstrapped with `create-react-app` cli. To get started run the following commands:

```bash
npm install
npm start
```

To run the tests: 

```bash
npm test
```

## Design Choices

### Styling

Since styling wasn't a key requirement, I decided to keep the app very plain and simple looking. I decided not to use any UI libraries since I did not want to add extra dependencies. All my UI components is custom built.

### State Managment

I am handling state using the React Context Api and take advantage react custom hook api to access my state across all my components.
This makes it easy to access my application state while still keeping a clean separation between layers.

### Infra

The infra folder is responsible for containing all logic that deals external concerns not directly related to the application. So things such as handling apis or localstorage is done here.

### Error Handling

When rendering, if an error occurs and React doesn't know what to render, its going to crash the application creating a terrible user experience. I wrapped my entire application with a `ErrorBoundary` to display a fallback UI in such a scenario.

### Testing

I have only written unit tests using `jest` for my application. There are no integration tests for this small app.