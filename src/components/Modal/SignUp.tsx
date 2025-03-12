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
import { AvatarIcon, LockFilledIcon } from '@heroui/shared-icons';
import { useState } from 'react';
import { ModalProps } from '@/type';

export default function SignUpModal({ isOpen, onOpenChange }: ModalProps) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
            <ModalBody>
              <Form onSubmit={onSubmit}>
                <Input
                  endContent={
                    <AvatarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="ID"
                  placeholder="Enter your ID"
                  variant="bordered"
                  value={id}
                  onValueChange={setId}
                />
                <Input
                  validate={(value) => {
                    if (value.length < 3) {
                      return 'Username must be at least 3 characters long';
                    }
                    return value === 'admin' ? 'Nice try!' : null;
                  }}
                  endContent={
                    <LockFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  value={password}
                  onValueChange={setPassword}
                />
                <Input
                  validate={(value) => {
                    if (value.length < 3) {
                      return 'Username must be at least 3 characters long';
                    }
                    return value === 'admin' ? 'Nice try!' : null;
                  }}
                  endContent={
                    <LockFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  value={checkPassword}
                  onValueChange={setCheckPassword}
                />
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Sign in
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
