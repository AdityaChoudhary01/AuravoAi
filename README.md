# GenKit + Next.js Chat Starter

This is a starter project demonstrating how to integrate the GenKit AI SDK with a Next.js application to build a simple chat interface.

## LiveDemo
https://auravoai.vercel.app/
## Description

This project provides a basic chat application powered by AI models integrated through GenKit. Users can interact with an AI chatbot, and the project showcases the setup and usage of GenKit within a Next.js framework, including flow definitions, component integration, and UI elements.

## Technologies Used

*   **Next.js:** React framework for building the frontend.
*   **GenKit:** AI SDK for integrating AI models and defining AI flows.
*   **Firebase:** Used for authentication and potentially other backend functionalities (see `src/lib/firebase.ts`).
*   **Tailwind CSS:** Utility-first CSS framework for styling.
*   **Shadcn/ui:** Reusable UI components built with Tailwind CSS.

## Project Structure

*   `src/ai/`: Contains GenKit related files, including flow definitions (`flows/`).
*   `src/app/`: Next.js application pages and routes.
*   `src/components/`: Reusable React components.
*   `src/hooks/`: Custom React hooks.
*   `src/lib/`: Utility functions and library configurations (e.g., Firebase setup).
*   `public/`: Static assets.

## Installation

1.  **Clone the repository:**

    
```bash
git clone <repository-url>
    cd <project-directory>
```

2.  **Install dependencies:**

    
```bash
npm install
```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root directory and add your necessary environment variables, such as API keys for AI models and Firebase configuration.

    
```
env
    # Example:
    # GENKIT_GOOGLE_AI_API_KEY=YOUR_GOOGLE_AI_API_KEY
    # NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
    # NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
    # NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
    # ... other Firebase config ...
    
```

4.  **Configure Firebase (Optional but recommended):**

    If you plan to use Firebase for authentication or other services, set up your Firebase project and update the configuration in `src/lib/firebase.ts` and your environment variables.

## Running the Project

1.  **Run the GenKit backend:**

    Open a terminal and run:

    
```bash
npm run dev:genkit
```

    This will start the GenKit development server, which handles the AI flows.

2.  **Run the Next.js frontend:**

    Open another terminal and run:

    
```bash
npm run dev
```

    This will start the Next.js development server. The application will be accessible at `http://localhost:3000` (or another port as indicated in your terminal).

## Development

*   **GenKit Flows:** Define and modify your AI flows in the `src/ai/flows/` directory.
*   **Frontend Development:** Develop the chat interface and other components in the `src/app/` and `src/components/` directories.
*   **UI Components:** Utilize the Shadcn/ui components provided in `src/components/ui/`.

## Contributing

If you'd like to contribute to this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear messages.
4.  Push your branch to your fork.
5.  Open a pull request to the original repository.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
