# Next.js Posts App

A professional Next.js application for displaying posts with minimalist dark design and clean architecture.

## 🏗️ Architecture

This project follows clean architecture principles with proper separation of concerns:

```
nextjs-posts-app/
├── services/           # API services and business logic
│   ├── api.js         # HTTP client and API functions
│   └── constants.js   # API configuration constants
├── hooks/             # Custom React hooks
│   └── usePosts.js    # Posts state management hook
├── pages/             # Next.js pages
│   ├── index.js       # Homepage
│   └── posts.js       # Posts collection page
├── styles/            # Global styles and CSS
│   └── globals.css    # Global CSS with dark theme
└── public/            # Static assets
```

## 🎨 Features

- **Professional Dark Theme**: Minimalist design with high contrast
- **Clean Architecture**: Separated API services and business logic
- **Custom Hooks**: Reusable state management
- **Error Handling**: Comprehensive error handling with user feedback
- **Responsive Design**: Works perfectly on all devices
- **Accessibility**: Proper ARIA labels and semantic HTML

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) to view the app

## 📁 Project Structure

### Services Layer (`/services`)
- **`api.js`**: Centralized API client with timeout, error handling, and retry logic
- **`constants.js`**: API configuration, endpoints, and HTTP status codes

### Custom Hooks (`/hooks`)
- **`usePosts.js`**: Custom hook for posts state management and API calls

### Pages (`/pages`)
- **`index.js`**: Homepage with navigation to posts
- **`posts.js`**: Posts collection with toggle and refresh functionality

## 🔧 API Integration

The app uses JSONPlaceholder API with the following features:
- Automatic timeout handling (10 seconds)
- Comprehensive error handling
- Request/response logging
- Support for multiple endpoints (posts, users, comments)

## 🎯 Key Improvements

1. **Separation of Concerns**: API logic separated from UI components
2. **Reusability**: Custom hooks for state management
3. **Error Handling**: Centralized error handling with user feedback
4. **Scalability**: Easy to add new features and API endpoints
5. **Maintainability**: Clean, documented code structure

## 🛠️ Development

- **Framework**: Next.js 15.4.6
- **Styling**: Tailwind CSS 4
- **Font**: Inter (Google Fonts)
- **API**: JSONPlaceholder REST API

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
# test1-frontend-test
