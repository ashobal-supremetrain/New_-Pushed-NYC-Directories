# New York State Directory System

## Overview
A comprehensive directory system for New York State businesses and services, featuring both a web application and public-facing website.

## Project Structure
```
.
├── data/               # Data files and databases
├── docs/              # Documentation files
├── config/            # Configuration files
├── tests/            # Testing files
├── scripts/          # Utility scripts
├── home/             # Main application code
│   └── ubuntu/
│       ├── nys_directory_app/     # Main application
│       ├── nys_directory_website/ # Public website
│       └── nys_directory_design/  # Design assets
```

## Features
- Business listing management
- Category-based navigation
- Interactive business submission
- Advanced search capabilities
- Ad management system

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8+
- PostgreSQL
- Git

### Installation
1. Clone the repository:
```bash
git clone https://github.com/ashobal-supremetrain/New_-Pushed-NYC-Directories.git
cd New_-Pushed-NYC-Directories
```

2. Install dependencies:
```bash
# For the web application
cd home/ubuntu/nys_directory_app
npm install

# For the website
cd ../nys_directory_website
npm install
```

3. Set up environment variables:
```bash
cp config/.env.example config/.env
# Edit .env with your configuration
```

4. Start the development servers:
```bash
# Start the main application
cd home/ubuntu/nys_directory_app
npm run dev

# Start the website
cd ../nys_directory_website
npm run dev
```

## Documentation
- [User Guide](docs/user_guide.md)
- [API Documentation](docs/api.md)
- [Development Guide](docs/development.md)
- [Deployment Guide](docs/deployment.md)

## Testing
```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e
```

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Security
For security concerns, please email ashobal@supremetrainingng.com

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 