import { SignupFormDemo } from '@/app/components/Login';
import Home from '@/app/page';
import { fireEvent, render, screen } from '@testing-library/react';



it('renders homePage', () => {
    render(<Home />);
    expect(screen.getByText(/Get started by editing/)).toBeInTheDocument();
});

describe('Login', () => {
    it('renders login form', () => {
        render(<SignupFormDemo />);
        expect(screen.getByText(/Welcome to Login/)).toBeInTheDocument();
    });
    it('renders login form', () => {
        render(<SignupFormDemo />);
        expect(screen.getByText(/Login to aceternity/)).toBeInTheDocument();
    });
    it('renders login form', () => {
        render(<SignupFormDemo />);
        expect(screen.getByText(/First name/)).toBeInTheDocument();
        expect(screen.getByText(/Last name/)).toBeInTheDocument();
        expect(screen.getByText(/Email/)).toBeInTheDocument();
    });
    it('should have 2 text with text Password', () => {
        render(<SignupFormDemo />);
        // Find all elements with text "Password"
        const passwordElements = screen.getAllByText(/Password/i);
        // Expect there to be 2 elements with text "Password"
        expect(passwordElements).toHaveLength(2);
    });
    it('should have one button with text "Sign up →"', () => {
        render(<SignupFormDemo />);
        // Find all buttons with the specified text
        const buttons = screen.getAllByRole('button', { name: /Sign up →/i });

        // Assert that there is exactly one button with the specified text
        expect(buttons).toHaveLength(1);
        expect(buttons[0]).toBeInTheDocument();
    });
    it('should have tree buttons of social media', () => {
        render(<SignupFormDemo />);
        // Find all buttons with the specified text
        const buttons = screen.getAllByRole('button');

        // Assert that there is exactly one button with the specified text
        expect(buttons).toHaveLength(4);
    });
    it('should show error message when form is submitted with empty fields', async () => {
        render(<SignupFormDemo />);
        const submitButton = screen.getByRole('button', { name: /Sign up →/i });
        submitButton.click();
        const errorMessageName = await screen.findByText(/First name is required/i);
        expect(errorMessageName).toBeInTheDocument();
        const errorMessageLastName = await screen.findByText(/Last name is required/i); 
        expect(errorMessageLastName).toBeInTheDocument();
        const errorMessageEmail = await screen.findByText(/Email is required/i);
        expect(errorMessageEmail).toBeInTheDocument();
        const errorMessagePassword = await screen.findByText(/min 8 characters/i);
        expect(errorMessagePassword).toBeInTheDocument();
        const errorMessageRepeatPassword = await screen.findByText(/Please confirm your password/i);
        expect(errorMessageRepeatPassword).toBeInTheDocument();
    });
    it('should show error message when the inpust are invalid', async () => {
        render(<SignupFormDemo />);
        const submitButton = screen.getByRole('button', { name: /Sign up →/i });
        fireEvent.change(screen.getByLabelText(/First name/i), { target: { value: 'Jo' } });
        const errorMessageNameLengt = await screen.findByText(/Min 3 chars/i);
        expect(errorMessageNameLengt).toBeInTheDocument();

        fireEvent.change(screen.getByLabelText(/Last name/i), { target: { value: 'Jo' } });
        const errorMessageLastNameLengt = await screen.findByText(/Min 3 chars/i);
        expect(errorMessageLastNameLengt).toBeInTheDocument();

    });
});
