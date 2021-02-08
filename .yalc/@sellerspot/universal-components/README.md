# Universal Components for SellerSpot Ecosystem.

## Development flow

-   `npm run dev`
-   `npm run storybook`

## To build

-   `npm run bulid`

## Linting

-   `npm run lint` | `npm run lint:fix`

## package build and deploy flow

1. build locally using `npm run build`
2. link locally with npm `npm link` - this will add the package to local npm repositoy
3. use the `npm install <directory-output-from-above-command-output>` in any project and do checks
4. if everything ok, do `npm version <version-type> -m <changes-log-message-string>` => note:- version-type will be one of these `major | minor | patch`
5. then run `npm publish --access public` note:- this needs authentication - should be the dev team member in npm.

## Note - while setting dev env:

`husky needs to be installed manually as the postinstall script of husky affects on global npm pacakge , when consumer installs`
