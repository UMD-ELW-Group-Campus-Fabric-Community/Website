# Getting Started
First, install the dependencies:
Note: This project was created using yarn, you may want to consider installing yarn first.
```bash
npm install -g yarn
```

```bash
npm install
# or
yarn | yarn install
```

Next, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

# Data Source
This repository uses data thats structure mirrors the data presented from the database. In order to query data directly from the database, clone the [database-1 repository](https://github.com/UMD-ELW-Group-Campus-Fabric-Community/Database-1) and run the docker-container. Refer to repository `README.md` for further instructions for setting up the database.
**Note that you do not need the database to develop the website.** Under the `data` folder you will see filler data that resembles a simular shape of the database.

## Static Site Generation (Static and Server Side)

A common issue when createing React Applications is the lack of search engine optimization as a result of the website being built with Javascript. NextJS sets out as a fullstack approach to compiling our application into HTML docs. In return, there becomes a need to define how our application is generated (e.g., Statically Generated, Generated Server-side, or a hybrid approach).

Static generation refers to generating the pages are build time for all posibile routes. For a page that is not consistently changing, building the page once and storing it improves the rendering time of that page drastically. Additionally, pages have the option to be revalidated after a given point of time. Server side generation (SSG) refers to building a page on each request. Although this website only uses static generation, it is important to note that NextJS implements these strategies on a per route basis.

# Components and Pages

To ease development of new routes, each major function and feature have been abstracted to a bare minimum component with their own styles. To create a new page, you can piece together components (e.g., DefaultNav, SubNav, Footer) to produce a new route.

# Launching Production Environment

In order to take advantage of static generation and avoid having to continuously rerender, you will need to run the following commands

```bash
# Build the application
yarn build
# Serve the website
yarn start
```

When building the application, you will need to have all endpoints accessible in order to staticaly generate the pages. 


# File Structure Breakdown
```
.
└── next-website/
    ├── .next (build path)
    ├── app (Redux components, experimental)
    ├── library /
    │   ├── components (page level panels)
    │   └── utils (supporting hooks, functions, individual elemets)
    ├── node_modules (dependencies)
    ├── pages (page routes)
    ├── public (static files)
    └── styles (css modules for styles)
```

## Learn More
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


## Future Implementation
- User login: there currently exist a Redux Store that can manage a user login but is not utilized throughout the application. In combination with the higher order component `withAuth` routes can be restricted to enforce user login if needed.
