# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Development
- **Start Development**: `npm start` - Runs the Electron app using Electron Forge
- **Install Dependencies**: `npm install`
- **Run Tests**: `npm test` - Runs Vitest test suite (currently limited tests)

### Building & Packaging
- **Package App**: `npm run package` - Creates packaged app for current platform
- **Build Distributables**: `npm run make` - Creates platform-specific installers/packages
- **Publish**: `npm run publish` - Publishes the app (configured for multiple platforms)

### Code Quality
- **Format Code**: `npx prettier --write .` - Auto-format code according to .prettierrc config
- **Lint**: `npm run lint` - Currently outputs "No linting configured"

### Testing
- **Run All Tests**: `npm test`
- **Run Single Test File**: `npx vitest run src/__tests__/[filename].test.js`
- **Run Tests in Watch Mode**: `npx vitest`

## Project Architecture

### High-Level Overview
This is an Electron-based AI assistant application called "Cheating Daddy" that provides real-time help during video calls, interviews, and meetings by capturing screen content and audio. The app uses Google Gemini 2.0 Flash Live for AI responses.

### Core Architecture Components

#### Main Process (src/index.js)
- **Entry Point**: Handles app lifecycle, window creation, and IPC setup
- **Stealth Features**: Implements anti-analysis measures and process name randomization
- **Global Configuration**: Manages app-wide settings through config.js

#### Window Management (src/utils/window.js) 
- **Transparent Overlay**: Creates always-on-top, transparent window with no frame
- **Global Shortcuts**: Manages keyboard shortcuts for window movement and actions
- **Cross-Platform**: Handles platform-specific window behaviors (macOS, Windows, Linux)

#### AI Integration (src/utils/gemini.js)
- **Live AI Sessions**: Manages Google Gemini real-time sessions with reconnection logic
- **Conversation Tracking**: Maintains session history and context
- **Audio Processing**: Handles screen capture and audio analysis
- **Profile-Based Prompts**: Uses different AI personas (interview, sales, meeting, etc.)

#### Frontend (Lit Components)
- **Main App**: `src/components/app/CheatingDaddyApp.js` - Root Lit component
- **View System**: Multiple views (MainView, AssistantView, OnboardingView, etc.)
- **No Build Process**: Uses pre-bundled Lit libraries (no webpack/vite)

#### Audio Utilities (src/audioUtils.js)
- **PCM to WAV Conversion**: Converts raw audio for debugging/playback
- **Audio Analysis**: Provides detailed audio buffer analysis
- **Debug Recording**: Saves audio files to ~/cheddar/debug for troubleshooting

### Key Architectural Patterns

#### IPC Communication
- Uses Electron's IPC for main/renderer communication
- Context isolation is currently **disabled** (marked as TODO to enable)
- All IPC handlers are centralized in index.js

#### Configuration Management
- Cross-platform config storage in OS-appropriate directories
- JSON-based configuration with automatic migration
- Local storage integration for renderer process settings

#### Stealth & Security
- Process name randomization for privacy
- Anti-analysis measures to avoid detection
- Content protection to prevent screen recording
- Window title randomization at runtime

#### Error Handling & Reconnection
- Automatic Gemini session reconnection with exponential backoff
- Context preservation across reconnections
- Comprehensive error boundaries in UI components

## Important Development Guidelines

### From AGENTS.md Integration

#### Migration Path (In Progress)
- **Target**: TypeScript + React architecture inspired by [`transcriber`](https://github.com/Gatecrashah/transcriber) project
- **Current State**: JavaScript + Lit Components
- **UI Framework**: Transitioning to [shadcn/ui](https://ui.shadcn.com) components
- **Type Safety**: Moving toward TypeScript strict mode

#### Code Standards
- **TypeScript**: Avoid `any`, prefer explicit interfaces when converting files
- **React Components**: Use functional components with hooks, wrap in error boundaries
- **IPC Security**: Validate and sanitize all parameters crossing renderer/main boundary
- **Audio Processing**: Keep heavy processing off UI thread
- **Testing**: All new features require tests (test infrastructure being developed)

#### Audio Processing Principles
- **16 kHz Compatibility**: Resample all audio before processing
- **Dual-Stream Architecture**: Separate microphone and system audio channels
- **Speaker Diarization**: Support for speaker identification in transcriptions
- **Voice Activity Detection**: Pre-filter silent segments
- **Memory Efficiency**: Stream large audio files instead of loading entirely

#### Shadcn/UI Integration
- **Component CLI**: Use `npx shadcn@latest add <component>` - never hand-roll
- **Path Aliases**: Import using `@/` prefix when available
- **Component Pattern**: Use `React.forwardRef` with `cn()` helper
- **Tailwind Theming**: Rely on CSS variables in `@/utils/tailwind`

#### Development Process
- **Prettier**: Run `npx prettier --write .` before commits (4-space indentation, 150 print width)
- **Platform Testing**: Test on macOS and Windows (Linux has limited support)
- **Upstream Merging**: Cherry-pick from original repo with short commit messages

### Cross-Platform Considerations
- **macOS**: Uses SystemAudioDump for system audio capture
- **Windows**: Uses loopback audio capture
- **Linux**: Limited to microphone input only
- **Permissions**: Requires screen recording and audio permissions on all platforms

### Security & Privacy
- **Local Processing**: Moving toward local transcription with whisper.cpp
- **Data Retention**: User controls for data storage and deletion
- **API Keys**: Stored locally, never transmitted in plain text
- **Process Hiding**: Multiple stealth levels (visible, balanced, ultra)

### Future Roadmap
1. **Local Transcription**: Integrate whisper.cpp for offline speech-to-text
2. **Dual Audio Capture**: Simultaneous microphone and system audio
3. **Speaker Diarization**: Speaker identification using tinydiarize
4. **Voice Activity Detection**: Filter silent segments before AI processing
5. **Testing Infrastructure**: Implement comprehensive test suite
6. **React Migration**: Complete transition from Lit to React components