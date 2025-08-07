## How to Implement Feature Flags in React

◇ Unleash

- Unleash is a feature flag management system created with the needs of large enterprises in mind.
- Unleash enables DevOps teams to implement activation strategies aligned with business objectives, controlling who has access to which feature and when​​.
- This flexibility removes deployment challenges and allows dynamic updates of user segments without needing to redeploy to production​​.

◇ What's a feature flag

- A feature flag (also called a feature toggle) is a software development technique that allows you to: Enable or disable features in your application without changing the code or redeploying.
- Leveraging feature flags allows developers to toggle on and off new features, whether you’re experimenting in your local environment, testing for QA purposes, or rolling out changes to users in production.
- gtCypress Real World App is an open-source React project that allows you to test and experiment in a React codebase that mirrors a real-world use case

Refer:

- https://docs.getunleash.io/feature-flag-tutorials/react
- https://www.youtube.com/watch?v=-VzI0wqLDuw

To Impliment this -

![Alt text](https://github.com/Nishanc07/Unleash-React/blob/main/public/react-unleash.png)

1. clone unleash (git clone git@github.com:Unleash/unleash.git)

```
git clone https://github.com/Unleash/unleash.git
cd unleash
docker compose up -d
```

Access it on http://localhost:4242

![Alt text](https://github.com/Nishanc07/Unleash-React/blob/main/public/Access-unleash.png)

2.  Create, enable, and configure a feature flag

- Create feature flag
- name the feature flag newNotificationsBadge. Use the default values in the rest of the feature flag form.
- Next, generate an API token to authenticate calls made to Unleash servers to access and use the feature flag in your project.
- Name the API token and connect to the Frontend SDK.
- Your new feature flag is created and ready to be used. Enable the flag for your development environment, which makes it accessible to be used in the React app we will generate from your local environment.

3. Clone an open source React app

```
git clone https://github.com/cypress-io/cypress-realworld-app.git
sudo npm install yarn@latest -g
yarn
yarn dev
```

You can access it on http://localhost:3000

4. It’s time to pull in your newly created feature flag in your app. Run the following command to install the Unleash React SDK in your repo:

Unleash SDK lets your React app talk to the Unleash server and check which features are enabled.

```
yarn add @unleash/proxy-client-react unleash-proxy-client

```

5. Wrap your whole app with a special Unleash wrapper — like giving your app ears to listen for signals.

- Wrap your App in the UnleashClientProvider
- This provider initializes the SDK and gives context to the rest of the app via React’s Context API.
  In src/index.tsx, import the <FlagProvider>: import { FlagProvider } from "@unleash/proxy-client-react"
  Paste in a configuration object:

  ```
  const config = {
    url: "http://localhost:4242/api/frontend", // Your local instance Unleash API URL
    clientKey: "<client_key>", // Your frontend token
    refreshInterval: 15, // How often (in seconds) the client should poll the proxy for updates
    appName: "cypress-realworld-app", // The name of your application. It's only used for identifying your application
  };

  ```

  - In the Router section of this file, wrap the FlagProvider around the existing <App /> component:

  ```
  <FlagProvider config={config}>
      <App />
  </FlagProvider>
  ```

6. Use the feature flag to rollout a notifications badge

   - In src/components/NavBar.tsx, import the useFlag feature:

   ```
   import { useFlag } from "@unleash/proxy-client-react"
   ```

   - Within the NavBar component in the file, define and reference the flag you created.

   ```
   const notificationsBadgeEnabled = useFlag("newNotificationsBadge");
   ```

   This flag will be used to conditionally render the notification icon Badge that is pulled in from Material-UI. If the flag is enabled, the notification badge will display to users and will route them to the Notifications view.

   - Find the Badge component in the file and wrap it in a boolean operator:

   ```
        {
            notificationsBadgeEnabled && (
                <Badge
                    badgeContent={allNotifications?.length}
                    data-test="nav-top-notifications-count"
                    classes={{ badge: classes.customBadge }}
                >
                    <NotificationsIcon />
                </Badge>
            );
        }

   ```

7. Verify the toggle experience

- In your Unleash instance, you can toggle your feature flag on or off to verify that the different UI experiences load accordingly

![Alt text](https://github.com/Nishanc07/Unleash-React/blob/main/public/toggle-deployment.png)

- Enabling the flag will result in being able to see the notifications icon in the top menu of the app.

Before Toggle:

![Alt text](https://github.com/Nishanc07/Unleash-React/blob/main/public/toggle-off.png)

After Toggle: (Right corner... notification icon)

![Alt text](https://github.com/Nishanc07/Unleash-React/blob/main/public/notification-icon.png)
