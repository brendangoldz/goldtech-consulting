# GoldTech Consulting - Commit Messages Documentation

## 📋 Table of Contents
1. [Commit Message Philosophy](#commit-message-philosophy)
2. [Conventional Commits](#conventional-commits)
3. [Message Structure](#message-structure)
4. [Type Guidelines](#type-guidelines)
5. [Scope Guidelines](#scope-guidelines)
6. [Breaking Changes](#breaking-changes)
7. [Examples](#examples)
8. [Git Workflow](#git-workflow)
9. [Automation & Tools](#automation--tools)
10. [Best Practices](#best-practices)

## 🎯 Commit Message Philosophy

### Why Good Commit Messages Matter
- **Code History**: Clear understanding of what changed and why
- **Debugging**: Easier to identify when and why bugs were introduced
- **Collaboration**: Team members can understand changes without context
- **Automation**: Enables automated changelog generation and versioning
- **Compliance**: Required for enterprise and government contracts

### Core Principles
- **Clear & Concise**: Easy to understand at a glance
- **Descriptive**: Explain what changed, not just that something changed
- **Consistent**: Follow established patterns and conventions
- **Actionable**: Use imperative mood (like giving commands)
- **Searchable**: Include relevant keywords for future searches

## 📝 Conventional Commits

### Specification
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Basic Structure
```
feat: add contact form validation
fix: resolve mobile navigation issue
docs: update API documentation
style: format code with prettier
refactor: extract reusable button component
test: add unit tests for contact service
chore: update dependencies
```

## 🏗️ Message Structure

### Header (Required)
- **Format**: `<type>[optional scope]: <description>`
- **Length**: Maximum 72 characters
- **Language**: English
- **Mood**: Imperative (e.g., "add feature" not "added feature")
- **Capitalization**: Lowercase for type and scope, sentence case for description

### Body (Optional)
- **Purpose**: Explain what and why, not how
- **Length**: Wrap at 72 characters
- **Format**: Use blank line to separate from header
- **Content**: 
  - Motivation for the change
  - Contrast with previous behavior
  - Any relevant context

### Footer (Optional)
- **Breaking Changes**: Start with `BREAKING CHANGE:`
- **Issues**: Reference issues with `Closes #123` or `Fixes #456`
- **Co-authors**: Use `Co-authored-by: Name <email>`

## 🏷️ Type Guidelines

### Primary Types

#### `feat`
New features or functionality
```bash
feat: add dark mode toggle
feat(contact): implement form validation
feat(auth): add social login options
```

#### `fix`
Bug fixes
```bash
fix: resolve mobile menu overlap issue
fix(contact): handle form submission errors
fix(api): correct CORS configuration
```

#### `docs`
Documentation changes
```bash
docs: update README with setup instructions
docs(api): add endpoint documentation
docs: fix typo in architecture guide
```

#### `style`
Code formatting, whitespace, semicolons (no logic changes)
```bash
style: format code with prettier
style(components): fix indentation
style: remove unused imports
```

#### `refactor`
Code refactoring without changing functionality
```bash
refactor: extract reusable utility functions
refactor(components): simplify prop handling
refactor: reorganize file structure
```

#### `test`
Adding or updating tests
```bash
test: add unit tests for contact form
test(api): add integration tests for Lambda
test: update snapshot tests
```

#### `chore`
Maintenance tasks, dependency updates, build changes
```bash
chore: update dependencies
chore: configure ESLint rules
chore: update build configuration
```

### Secondary Types

#### `perf`
Performance improvements
```bash
perf: optimize image loading
perf(api): reduce Lambda cold start time
perf: implement code splitting
```

#### `ci`
Continuous integration changes
```bash
ci: add accessibility testing
ci: update GitHub Actions workflow
ci: configure automated deployment
```

#### `build`
Build system or external dependencies
```bash
build: update webpack configuration
build: add source map generation
build: optimize bundle size
```

#### `revert`
Revert previous commits
```bash
revert: revert "feat: add experimental feature"
revert(123abc): revert contact form changes
```

## 🎯 Scope Guidelines

### Common Scopes

#### Frontend Scopes
```bash
feat(components): add reusable button component
fix(navigation): resolve mobile menu issues
style(forms): improve form styling
test(hooks): add tests for custom hooks
```

#### Backend Scopes
```bash
feat(api): add user authentication endpoint
fix(lambda): handle SES errors gracefully
perf(api): optimize database queries
test(api): add integration tests
```

#### Infrastructure Scopes
```bash
feat(aws): configure CloudFront distribution
fix(deploy): resolve Amplify build issues
chore(aws): update Lambda runtime
ci(aws): add automated testing
```

#### Documentation Scopes
```bash
docs(api): document new endpoints
docs(architecture): update system diagrams
docs(accessibility): add WCAG guidelines
```

### Scope Rules
- **Lowercase**: Always use lowercase
- **Descriptive**: Be specific about the area affected
- **Consistent**: Use the same scope names across the project
- **Optional**: Not required for every commit

## ⚠️ Breaking Changes

### Breaking Change Format
```bash
feat!: remove deprecated API endpoints

BREAKING CHANGE: The /api/v1/users endpoint has been removed.
Use /api/v2/users instead.
```

### Breaking Change Indicators
- **Exclamation Mark**: Add `!` after type/scope
- **Footer**: Include `BREAKING CHANGE:` in footer
- **Description**: Explain what breaks and migration path

### Examples
```bash
feat(api)!: change user authentication flow

BREAKING CHANGE: Authentication now requires JWT tokens instead of session cookies.
Update your client code to handle the new authentication method.

fix!: resolve security vulnerability in contact form

BREAKING CHANGE: Contact form now requires CSRF tokens.
All form submissions must include the csrf_token field.

refactor(components)!: restructure component props

BREAKING CHANGE: Button component props have been reorganized.
- `variant` prop is now `appearance`
- `size` prop is now `scale`
```

## 📚 Examples

### Good Commit Messages

#### Feature Addition
```bash
feat(contact): add form validation with real-time feedback

- Implement client-side validation for all form fields
- Add visual feedback for validation errors
- Include accessibility features for screen readers
- Add unit tests for validation logic

Closes #123
```

#### Bug Fix
```bash
fix(navigation): resolve mobile menu accessibility issues

The mobile navigation menu was not properly announcing
state changes to screen readers. This fix adds proper
ARIA attributes and live regions.

- Add aria-expanded to menu button
- Include aria-controls for menu list
- Add role="menu" to navigation list
- Implement keyboard navigation support

Fixes #456
```

#### Documentation Update
```bash
docs: update AWS deployment guide

- Add step-by-step Amplify setup instructions
- Include Lambda function deployment steps
- Add troubleshooting section for common issues
- Update screenshots for latest AWS console
```

#### Refactoring
```bash
refactor(components): extract shared form components

Extract common form patterns into reusable components
to reduce code duplication and improve maintainability.

- Create FormField component for input fields
- Create FormGroup component for field grouping
- Update all forms to use new components
- Add comprehensive tests for new components
```

#### Performance Improvement
```bash
perf: implement image lazy loading

Add lazy loading for all images to improve page load
performance, especially on mobile devices.

- Implement Intersection Observer API
- Add loading placeholders for images
- Optimize image formats (WebP with fallbacks)
- Reduce initial bundle size by 15%

Co-authored-by: Jane Smith <jane@example.com>
```

### Bad Commit Messages

#### Too Vague
```bash
# ❌ BAD
fix stuff
update code
changes
wip
```

#### No Context
```bash
# ❌ BAD
fix bug
add feature
update
```

#### Wrong Mood
```bash
# ❌ BAD
feat: added new button
fix: fixed the issue
docs: updated documentation
```

#### Too Long
```bash
# ❌ BAD
feat: add a new contact form component with validation, error handling, accessibility features, and responsive design that works on all devices
```

## 🔄 Git Workflow

### Branch Naming
```bash
# Feature branches
feature/contact-form-validation
feature/dark-mode-toggle
feature/user-authentication

# Bug fix branches
bugfix/mobile-navigation-issue
bugfix/contact-form-submission-error
bugfix/accessibility-violations

# Hotfix branches
hotfix/security-vulnerability
hotfix/critical-bug-production

# Documentation branches
docs/api-documentation-update
docs/accessibility-guidelines

# Chore branches
chore/dependency-updates
chore/eslint-configuration
```

### Commit Workflow
```bash
# 1. Create feature branch
git checkout -b feature/contact-form-validation

# 2. Make changes and commit frequently
git add src/components/ContactForm.js
git commit -m "feat(contact): add client-side validation"

git add src/components/ContactForm.test.js
git commit -m "test(contact): add validation tests"

git add src/components/ContactForm.css
git commit -m "style(contact): add validation error styles"

# 3. Push branch
git push origin feature/contact-form-validation

# 4. Create pull request with descriptive title and body
```

### Pull Request Guidelines
```markdown
## Description
Brief description of changes and motivation.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Accessibility testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] All imports sorted and unused removed

## Related Issues
Closes #123
```

## 🛠️ Automation & Tools

### Commitizen
```json
{
  "devDependencies": {
    "commitizen": "^4.3.0",
    "cz-conventional-changelog": "^3.3.0"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}
```

### Husky Pre-commit Hook
```json
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

### Commitlint Configuration
```javascript
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'ci',
        'build',
        'revert',
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'always', 'sentence-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72],
  },
};
```

### Automated Changelog
```json
{
  "scripts": {
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s",
    "version": "conventional-changelog -p angular -i CHANGELOG.md -s && git add CHANGELOG.md"
  }
}
```

### GitHub Actions
```yaml
# .github/workflows/commit-lint.yml
name: Commit Lint

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  commitlint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx commitlint --from ${{ github.event.pull_request.base.sha }} --to ${{ github.sha }} --verbose
```

## ✅ Best Practices

### Do's
- ✅ Use conventional commit format
- ✅ Write clear, descriptive messages
- ✅ Keep header under 72 characters
- ✅ Use imperative mood
- ✅ Include scope when relevant
- ✅ Reference issues in footer
- ✅ Make atomic commits (one logical change per commit)
- ✅ Test before committing
- ✅ Use present tense ("add feature" not "added feature")

### Don'ts
- ❌ Use vague messages like "fix bug" or "update"
- ❌ Include unnecessary details in header
- ❌ Mix multiple unrelated changes in one commit
- ❌ Commit broken or incomplete code
- ❌ Use past tense in commit messages
- ❌ Forget to reference related issues
- ❌ Commit sensitive information (passwords, API keys)
- ❌ Use emojis in commit messages (keep it professional)

### Commit Message Templates
```bash
# Feature template
feat(scope): add [feature description]

[Detailed description of what was added and why]

[Any additional context or notes]

Closes #[issue-number]

# Bug fix template
fix(scope): resolve [issue description]

[Detailed description of the problem and solution]

[Any additional context or notes]

Fixes #[issue-number]

# Documentation template
docs(scope): update [documentation area]

[Description of what documentation was updated]

[Any additional context or notes]

# Refactoring template
refactor(scope): [refactoring description]

[Description of what was refactored and why]

[Any additional context or notes]
```

### Team Guidelines
1. **Review Process**: All commits must be reviewed before merging
2. **Squash Commits**: Squash related commits before merging to main
3. **Conventional Format**: All commits must follow conventional commit format
4. **Issue References**: Always reference related issues when applicable
5. **Breaking Changes**: Clearly mark and document breaking changes
6. **Testing**: Ensure all tests pass before committing
7. **Documentation**: Update documentation for any API or behavior changes

---

*This commit message documentation should be followed by all team members working on the GoldTech Consulting repository. Consistent, clear commit messages are essential for maintaining a professional codebase and enabling effective collaboration.*

*Last Updated: December 2024*
*Version: 1.0*
