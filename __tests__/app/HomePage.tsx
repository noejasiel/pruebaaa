import { SignupFormDemo } from '@/app/components/Login';
import Home from '@/app/page';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import exp from 'constants';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

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

        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'Jo' } });
        const errorMessageEmail = await screen.findByText(/Invalid email address/i);
        expect(errorMessageEmail).toBeInTheDocument();

        const passwordInputs = screen.getAllByLabelText(/Password/i);
        const repeatPasswordInput = screen.getByLabelText(/Repeat Password/i);

        // Selecciona el primer campo de contraseña
        const passwordInput = passwordInputs[0];

        fireEvent.change(passwordInput, { target: { value: 'Jo' } });
        const errorMessagePassword = await screen.findByText(/min 8 characters/i);
        expect(errorMessagePassword).toBeInTheDocument();

        fireEvent.change(repeatPasswordInput, { target: { value: 'Jon' } });
        const errorMessageRepeatPassword = await screen.findByText(/Passwords must match/i);
        expect(errorMessageRepeatPassword).toBeInTheDocument();
    });

    it('submit form with valid inputs', async () => {
        const mockResponse = {
            data: {
                "firstname": "Jonathan",
                "lastname": "Doe",
                "email": "preba@gmai.com",
                "password": "12345678",
                "repeatPassword": "12345678",
                "id": 101
            }
        }

        mockedAxios.post.mockResolvedValue(mockResponse); // Simula una respuesta exitosa
        render(<SignupFormDemo />);
        const submitButton = screen.getByRole('button', { name: /Sign up →/i });
        fireEvent.change(screen.getByLabelText(/First name/i), { target: { value: 'Jonathan' } });
        fireEvent.change(screen.getByLabelText(/Last name/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'preba@gmai.com' } });
        const passwordInputs = screen.getAllByLabelText(/Password/i);
        const passwordInput = passwordInputs[0];
        fireEvent.change(passwordInput, { target: { value: '12345678' } });
        fireEvent.change(screen.getByLabelText(/Repeat Password/i), { target: { value: '12345678' } });
        userEvent.click(submitButton);

        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalledWith(
                'https://jsonplaceholder.typicode.com/posts',
                expect.objectContaining({
                    email: 'preba@gmai.com',
                    firstname: 'Jonathan',
                    lastname: 'Doe',
                    password: '12345678',
                    repeatPassword: '12345678'
                })
            );
            expect(mockedAxios.post).toHaveBeenCalledTimes(1); // Asegúrate de que se haya llamado una vez
        });

    });

    it('handles Api error', async () => {
        mockedAxios.post.mockRejectedValue(new Error('Error'));
        render(<SignupFormDemo />);
        const submitButton = screen.getByRole('button', { name: /Sign up →/i });
        fireEvent.change(screen.getByLabelText(/First name/i), { target: { value: 'Jonathan' } });
        fireEvent.change(screen.getByLabelText(/Last name/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'preba@gmai.com' } });
        const passwordInputs = screen.getAllByLabelText(/Password/i);
        const passwordInput = passwordInputs[0];
        fireEvent.change(passwordInput, { target: { value: '12345678' } });
        fireEvent.change(screen.getByLabelText(/Repeat Password/i), { target: { value: '12345678' } });
        userEvent.click(submitButton);
        
        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalledTimes(1);
            // expect(screen.getByText(/Error/)).toBeInTheDocument();
        });
    });

});
