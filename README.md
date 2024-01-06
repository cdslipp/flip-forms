*This is a work in progress*


Documentation: Flip Forms - Slide Style Svelte Forms
----------------------------------------------------

### Overview

Flip Forms is a slide-style form system designed in Svelte, focusing on presenting one question (form field) to the user at a time. This approach enhances user engagement and simplifies the form-filling process. The system is highly scalable, allowing for the easy addition of new field types and form actions.

### High-Level Architecture

#### High-Level Route

Manages the initialization of the form process. It determines the first form field to present based on the provided action and type.

#### Field-Level Route

Handles individual form fields, managing field validation and navigation to the next field in the sequence.

### Scalability

#### Adding New Field Types

Flip Forms supports an extendable field type mapping system. This system allows the integration of new Zod schema types and their corresponding field types in the form. Extending the form to support new field types involves updating the schema and the field type mapping.

#### Handling Different Form Actions

The system can handle various form actions like add, update, and delete. The initialization and processing of these actions are managed at both the high-level and field-level routes. This design allows for custom behaviors and processing logic based on the specific form action.

### Slide Style Interaction

The core feature of Flip Forms is its slide-style interaction, where users are presented with one form field at a time. This design:

-   Enhances user focus by reducing cognitive load and distractions.
-   Provides a smooth navigation experience, automatically guiding the user through the form fields.
-   Supports a wide range of field types, each tailored to collect specific types of information effectively.

### Form Completion and Navigation

Upon submission of a field, the form intelligently determines the next field to present. If the user is on the last field, the form can redirect them to a completion page or perform a final action. This navigation logic is an integral part of the form's seamless user experience.


### File Structure Overview

Flip Forms is structured to separate concerns between initializing form processes and managing individual form fields. This separation enhances readability and maintainability. The project structure centers around two primary directories:

1.  High-Level Route Directory (`/forms/[action]/[type]`):

    -   Contains files that manage the initiation of different form actions (like add, update, delete) and types.
    -   Responsible for setting the stage for the form process, determining the first field to be presented based on the specified action and type.
2.  Field-Level Route Directory (`/forms/[action]/[type]/[fieldType]/[fieldName]`):

    -   Manages each individual form field.
    -   Handles validation, user input, and navigation between fields.

### Routing Structure

The routing structure is designed to accommodate a dynamic, slide-style form presentation, where each form field is presented one at a time in a sequential manner.

#### High-Level Route (`/forms/[action]/[type]`)

-   Initiation: This route acts as the entry point for the form process. It uses Svelte's dynamic routing capabilities to capture the form's action (`add`, `update`, `delete`, etc.) and type.
-   First Field Redirection: Based on the provided action and type, the route determines and redirects the user to the first field of the form. This redirection is handled dynamically, accounting for different field types and order.

#### Field-Level Route (`/forms/[action]/[type]/[fieldType]/[fieldName]`)

-   Field Management: Each route is responsible for a single field in the form. It captures the field type and name from the URL parameters.
-   Dynamic Field Rendering: Depending on the field type (text, select, etc.), the appropriate Svelte component is rendered.
-   Field Validation and Navigation: The route manages validation of user input for its field. Upon successful validation, it navigates to the next field or concludes the form process, based on the field order defined in the schema.

### Detailed Explanation of URL Structure

-   `/forms/[action]/[type]`:
    -   `[action]`: Represents the form action like `add`, `update`, or `delete`.
    -   `[type]`: Defines the type of form, such as `document`, `profile`, etc. It helps in loading the appropriate schema and form components.
-   `/forms/[action]/[type]/[fieldType]/[fieldName]`:
    -   `[fieldType]`: Indicates the type of the current field (e.g., `text`, `select`). It is dynamically determined based on the form schema.
    -   `[fieldName]`: The specific name of the field being displayed, like `title`, `docType`, or `author`.