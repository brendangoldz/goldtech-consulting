# Server-Side Rendering (SSR) Server

This is a basic Express server implementation that demonstrates server-side rendering capabilities for the GoldTech Consulting website.

## Features

- **Route-specific meta tags**: Different titles and descriptions for landing, consulting, and marketing pages
- **Static file serving**: Serves the built React app
- **SEO-friendly**: Injects proper meta tags based on the route
- **Deployable**: Can be deployed to any Node.js hosting platform

## Usage

### Development

1. Build the React app:
   ```bash
   npm run build
   ```

2. Start the server:
   ```bash
   npm run server
   ```

   Or with auto-reload (requires nodemon):
   ```bash
   npm run server:dev
   ```

3. Visit `http://localhost:3001` to see the app

### Production Deployment

This server can be deployed to:
- **AWS EC2**: Run as a Node.js application
- **AWS Elastic Beanstalk**: Deploy as a Node.js app
- **Heroku**: Deploy with Procfile
- **DigitalOcean App Platform**: Deploy as Node.js app
- **Railway/Render**: Deploy directly from Git

### Environment Variables

- `PORT`: Server port (default: 3001)

## Limitations

This is a **crude example** of SSR. It currently:
- ✅ Injects route-specific meta tags
- ✅ Serves static files
- ❌ Does NOT render React components on the server
- ❌ Does NOT handle data fetching on the server

For full SSR capabilities, consider:
- **Next.js**: Full-featured React framework with SSR
- **Remix**: Full-stack React framework
- **Gatsby**: Static site generation with SSR
- **Custom SSR**: Build your own with React Server Components

## Future Enhancements

To add full React component rendering:

1. Set up a build process that creates server-compatible bundles
2. Use `react-dom/server` to render components to strings
3. Inject rendered HTML into the template
4. Handle hydration on the client side

## Notes

- The server expects the React app to be built in the `build/` directory
- Make sure to run `npm run build` before starting the server
- The server serves static files and injects meta tags based on routes
- Client-side routing is handled by React Router

