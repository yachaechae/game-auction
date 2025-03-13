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
import React, { FormEvent, useState } from 'react';
import { AuthDataType, ModalProps } from '@/type';
import { useMutation } from '@tanstack/react-query';
import { loginApi } from '@/api/authService';

export default function LoginModal({ isOpen, onOpenChange }: ModalProps) {
  const [action, setAction] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data: AuthDataType) => {
      setAction(`Form submitted successfully: ${JSON.stringify(data)}`);
      onOpenChange?.(false);
    },
    onError: (error: any) => {
      console.error('API 요청 실패:', error);
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

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

  const onReset = () => {
    setAction('reset');
    setError(null);
  };

  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <Form onReset={onReset} onSubmit={onSubmit}>
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
