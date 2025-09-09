// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { useNavigate } from "react-router-dom";

// type LoginPromptModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
// };

// const LoginPromptModal: React.FC<LoginPromptModalProps> = ({ isOpen, onClose }) => {
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     onClose();
//     navigate("/login");
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-sm">
//         <DialogHeader>
//           <DialogTitle>Login Required</DialogTitle>
//         </DialogHeader>
//         <p className="text-muted-foreground my-4">
//           You must be logged in to purchase an album. Please login to continue.
//         </p>
//         <DialogFooter className="flex justify-end gap-2">
//           <Button variant="outline" onClick={onClose}>Cancel</Button>
//           <Button onClick={handleLogin}>Login</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default LoginPromptModal;
