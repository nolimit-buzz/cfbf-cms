# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

## 📥 Email Log

Every email the website sends is archived in the **Email Log** collection type — the contact enquiry
(`type: contact`) and the acknowledgement to the enquirer (`type: contact-ack`), whether the send
succeeded or failed. Each entry stores the structured form `payload`, a plain-text `body`, the
provider receipt (`messageId`, `smtpResponse`), and a short quotable `ref` such as `K7M2QP`.

To get the submissions as a spreadsheet, open Content Manager → Email Log and click **Export all**
(or tick rows and use the bulk **Export**, or open one entry and use **Export** in its panel). The
workbook has a sheet per enquiry role, one for acknowledgements, and a catch-all. It is built in the
browser from the admin session, so it can never show more than the signed-in user could already see.

### Required manual step, once per environment

> Settings → Users & Permissions Plugin → Roles → **Public** → Email-log → tick **create** → Save.

The frontend POSTs its log entries anonymously, and this permission is **not** part of the content
seed — a fresh staging or production database rejects every archive write until someone ticks the
box. The failure is invisible by design: the email still sends and the visitor still sees success,
so nothing but a `[mail] failed to log email in Strapi` line in the frontend logs will tell you.

Leave `find` and `findOne` **off**. The archive holds visitors' names, email addresses, and
free-text messages, and must never be readable over the public API.

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

```
yarn strapi deploy
```

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
