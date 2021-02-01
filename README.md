# Point of Sale Application

Point of sale is one of the core offerings for the Multitenat SellerSpot Saas platform. This repo contains the source code for the standalone pos system. The platform will be served to multiple tenants using the sellerspot core saas platform, which provisions the necessary placeholder to deploy and manage databases and domain settings for tenants seamlessly. Hence this pos system does not need to worry about dealing with multi-tenants configurations. The only goal of this product is to acheive standalone point of sale product, which runs monolithically. This POS app interacts with POS server which provides necessary apis to interact with databases.

## Some best practices to follow during development

1. **Prettier should be installed** - `format on save` should be enabled (`.vscode` script has been created for the same purpose).
2. Typings should be added for each and every piece/block of components and function props and return data. (strictly avoid using `any` - PR will be rejected by CI if it finds any instance of `any`).
3. Block comment should be added for each and every props in typings (not necesary - but should be added to give better understandability).

```typescript
interface ButtonProps {
    /** the background color of the button */
    color: string;
    /** the text to show inside the button */
    text: string;
}
```

4. Typings should be added for hooks

```typescript
interface User {
    email: string;
    id: string;
}

// the generic is the < >
// the union is the User | null
// together, TypeScript knows, "Ah, user can be User or null".
const [user, setUser] = useState<User | null>(null);
```

5. Declare module in present in `src/react-app-env.d.ts`. If any new file extension is to be used in the project, please add it in this file, so that typescript will allow the file extension within the project.

6. Type packages should be added (Eg. `@types/<package-name>`) while installing third-party libraries.

---

## Techstack

-   **Adobe XD** for design prototyping
-   **Typescript**
-   **Redux Toolkit** for state management
-   **eslint** for style linting (tslint is deprecated)
-   **Prettier** for formatting, code style consistency and improved DX.
-   **SCSS** as the styling language
-   **CSSComb** for scss property sorting
-   **Service workers** => yet to implement

---

## Required VSCode Extentions

-   [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
-   [SCSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-scss)
-   [Relative Path](https://marketplace.visualstudio.com/items?itemName=jakob101.RelativePath)
-   [CSS Modules](https://marketplace.visualstudio.com/items?itemName=clinyong.vscode-css-modules)
-   [CSSComb](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-csscomb)
-   [sort-imports](https://marketplace.visualstudio.com/items?itemName=amatiasq.sort-imports)
-   [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)

---

## Atomic Project Directory Structuring

```yaml

src:
	components:
		- contains all the components which are common throughout the project scope
		- it contains the component and its specific logic in its own directory
		- Example:
			- CommonComponent: - directory
				- CommonComponent.tsx - exported component
				- commonComponent.actions.tsx - logic and operations of the component
				- commonComponent.module.scss - styling for the component

	layouts:
		- layouts should be access only inside index.tsx at root directory
		- all routes must only be handled in layouts which holds the core container of the app
		- ExampleLayout: - dir
			- components:
				- components specific to this layouts
			- exampleLayout.actions.tsx - logic and operations of the component
			- exampleLayout.module.scss - styling for the component
			- ExampleLayout.tsx - main exported component

	pages:
		- should be only be access by components inside the layouts directory
		- ExamplePage:
			- components:
				- components related to this page
			- ExamplePage.tsx - exported page
			- examplePage.actions.tsx - logic and operations of the page
			- examplePage.module.scss - styling for the page

```

---

## Linking project with local repos (universal-components, etc)

A detailed explanation for this process can be found [here](https://www.notion.so/Setting-up-Universal-Components-npm-link-94800cdddeda4deba3d550db4bc32546).
