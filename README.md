# Introduction

The GraphPolaris visualization API is the official API for creating visualization plugins.
These plugins can be published to and installed from the [marketplace](http://localhost:5173), and then run inside the GraphPolaris platform.
<!-- TODO: don't forget to update the link after deployment. -->

The API is designed to be as user-friendly as possible. No boilerplate code is required, nor any knowledge of the underlying protocol.

Furthermore, it is designed with compatibility in mind. It works in all modern browsers, and has very few dependencies.

# Getting Started

## Installation

To get started with creating a visualization plugin, install one of the available templates:

- [TypeScript with Vite + React](https://github.com/PolarExpress/vis-plugin-template-vite-react)
<!-- TODO: don't forget to update links once migrations to Gitlab/npm happen -->

These templates contain the necessary dependencies and folder structure for writing a plugin.

Then install all dependencies by running the install command of your preferred package manager:
- npm: `npm i`
- pnpm: `pnpm i`
- yarn: `yarn`

## Writing a Plugin

You should now see two folders, `vis` and `settings`, both containing some boilerplate code the chosen framework requires.  
These correspond to two separate components: 

- Inside the `vis` folder is the code for rendering the visualization itself. You will most likely write most of the code here.  
- Inside the `settings` folder is the code for rendering the settings. If your visualization is configurable, any configuration options should be here, as well as a component which a user can use for changing the settings.

Both of these folders need to be present in the final output, both containing an `index.html` file, which is the entry point to your plugin.

In most cases, only the `vis.js(x)` and `settings.js(x)` will need to be changed, as well as any files and folders you decide to include. The other files contain boilerplate necessary for your framework. These might need to change if you rename any files, but most editors do this automatically.

> Any external dependencies can theoretically be used. *However, we recommend sticking to well-known and reputable packages. If it can't be verified that your plugin is safe, it cannot be published.*

### Writing the Visualization

A visualization is simply a program which makes use of data provided by GraphPolaris, and displays some visual representation of those data. It does not matter how it does this.

The default location for the visualization itself is in the `vis/vis.js(x)` file. Here, you can write the code that constitutes the visualization. Of course, feel free to include 

You can make use of the following data:

- [Graph data](./interfaces/base.GraphQueryResult.html): the raw data of the graph. This is the direct result of the query.
- [Schema graph](./types/base.SchemaGraph.html): the schema of the queried graph.
- [Machine learning data](./types/base.ML.html): additional data provided by various machine learning plugins.
  <!-- TODO: add documentation on how to use these. -->
- [Settings](./types/base.Settings.html): the currently selected configuration.

The method used to access these will differ slightly depending on the framework. For more specific details, you should look at the documentation of your framework of choice.  
In general however, the required functions can be imported from `@graphpolaris/vis-api/<framework>`, and the associated types from `@graphpolaris/vis-api`.

### Writing the Settings component

Once you have made a visualization, you might want to make it configurable by users of your plugin. For this, you can edit the `settings/settings.js(x)` file. This is a program that displays all configuration options to the user, and notifies the parent GraphPolaris website of any changes the user makes. These will then be transferred over to the visualization.

Here, then only data you have available are:

- [Settings](./types/base.Settings.html): the currently selected configuration.
- A function to notify the parent site of any settings changes.
- [Graph metadata](./types/base.GraphMetaData.html): metadata about the currently visible graph.

Once again, the method of accessing these will differ slightly depending on the framework.

## Debugging the Plugin

All templates include code to test your plugin locally. Typically, this will be done using [Storybook.js](https://storybook.js.org/).

This allows you to see the plugin running locally. You are encouraged to make heavy use of this tool in order to ensure your plugin works properly.  
In most cases, the tool will work out-of-the-box, without having to change any code.

The template provides sample data for the visualization, although you can supply your own if you want. However, ensure your data follow the exact same format as the provided sample data, as this is the same as the plugin will receive when it is running online.

## Publishing the plugin

After you are finished writing the plugin, verify that it builds correctly by running the build script included in the template:
- npm: `npm run build`
- pnpm: `pnpm build`
- yarn: `yarn build`

Running this script should not cause any warnings or errors. If it does, you should fix these before publishing.  
If everything works well, you should see a folder named `dist` in the root directory of your project, which contains (at least) folders `vis` and `settings`, both containing an `index.html` file.

After you have verified your plugin builds correctly, you can submit it for review to GraphPolaris. Be sure to specify that it concerns publishing a Visualization plugin. Your submission should contain:

- All source code and configuration files of the plugin, both what was included in the template and what you wrote yourself.
- A README.md file, containing a description of your plugin and the available configurations.
- The name of the plugin and author, as you wish these to be displayed.

It should not contain:

- The `node_modules` folder.
- The `dist` folder.