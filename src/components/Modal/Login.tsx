import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Form,
} from '@heroui/react';
import React, { FormEvent } from 'react';
import { AuthDataType, ModalProps } from '@/type';
import { useMutation } from '@tanstack/react-query';
import { loginApi } from '@/api/authService';

export default function LoginModal({ isOpen, onOpenChange }: ModalProps) {
  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      onOpenChange?.(false);
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as {
      [key: string]: FormDataEntryValue;
    };

    const userData: AuthDataType = {
      loginId: String(data.loginId),
      password: String(data.password),
    };

    mutation.mutate(userData);
  };

  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <Form onSubmit={onSubmit}>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody className="w-full">
                <Input
                  isRequired
                  errorMessage="Please enter a valid login ID"
                  label="Login ID"
                  labelPlacement="outside"
                  name="loginId"
                  placeholder="Enter your ID"
                  type="text"
                />

                <Input
                  isRequired
                  validate={(value) => {
                    if (value.length < 3) {
                      return 'Username must be at least 3 characters long';
                    }
                    return value === 'admin' ? 'Nice try!' : null;
                  }}
                  errorMessage="Please enter a valid password"
                  label="Password"
                  labelPlacement="outside"
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                />
              </ModalBody>
              <ModalFooter className="w-full">
                <Button
                  color="danger"
                  type="reset"
                  variant="flat"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </ModalFooter>
            </Form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
