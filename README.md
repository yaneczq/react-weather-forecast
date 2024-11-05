# Weather Forecast

React application that displays current weather information and a 5-day forecast with a dynamic icon representing various weather conditions.

![App Screenshot](./public/screenshot.png)

Live Demo [here](https://rwf-jk.vercel.app/).

## Features

- **City Search**: Allows users to search for a city's weather.
- **Current Weather**: Displays real-time weather conditions for the selected city.
- **5-Day Forecast**: Provides daily maximum temperatures for the next five days.
- **Dynamic Weather Icons**: Shows different icons based on the time of day and weather conditions.

## Technologies Used

## Technologies Used

### Front-End Frameworks and Libraries
- **React**: Front-end JavaScript library for building the user interface.
- **react-dom**: Entry point for DOM-related rendering methods.
- **react-icons**: A library with customizable icons for your project.

### Build Tools and Styling
- **Vite**: A fast build tool for modern web projects.
- **Sass**: For styling components.

### Code Quality Tools
- **ESLint & Prettier**: Code linting and formatting tools for a consistent codebase.

### APIs and Environment Management
- **OpenWeather API**: Used to fetch weather and forecast data.
- **dotenv**: A module to load environment variables from a `.env` file.

### Prop Type Validation
- **prop-types**: For runtime type checking of React props.

## Setup

1. **Clone the repository**:

  ```bash
  git clone https://github.com/yaneczq/react-weather-forecast.git
  ```

2. Navigate to the project directory:
   
  ```
  cd react-weather-forecast
  ```

3. **Set Up API**:
  - Create a `.env` file in the root of the project.
  - Add your OpenWeather API key to the `.env` file like this:
  ```
  VITE_OPENWEATHERMAP_API_KEY=your_api_key_here
  ```
  - Replace `your_api_key_here` with your actual API key from OpenWeather.

3. Install dependencies:
   
  ```
  npm install
  ```

4. Start the development server:
  ```
  npm run dev
  ```

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
