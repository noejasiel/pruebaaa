import { SignupFormDemo } from '@/app/components/Login';
import Home from '@/app/page';
import {render, screen} from '@testing-library/react';



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
    it('should have one button with text "Sing up"', () => {
        render(<SignupFormDemo />);
        screen.debug();
        expect(screen.getAllByRole('button', {name: /Sing up →/i})).toBeInTheDocument();
    });

});
