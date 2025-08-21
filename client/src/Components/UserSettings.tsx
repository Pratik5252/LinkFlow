import { useState } from 'react';
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from './ui/sheet';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { updateProfile } from 'firebase/auth';
import { deleteUserAccount } from '@/services/auth';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { User, Trash2, AlertTriangle, Settings } from 'lucide-react';

const UserSettings = () => {
    const { user } = useAuth();

    const [displayName, setDisplayName] = useState(user?.displayName || '');

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState('');

    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const handleUpdateProfile = async () => {
        if (!user || !displayName.trim() || displayName === user?.displayName)
            return;

        setIsUpdatingProfile(true);

        try {
            await updateProfile(user, { displayName: displayName.trim() });
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile. Please try again.');
        } finally {
            setIsUpdatingProfile(false);
        }
    };

    const deleteAccountMutation = useMutation({
        mutationFn: deleteUserAccount,
        onSuccess: () => {
            window.location.href = '/auth';
        },
        onError: (error: Error) => {
            console.error('Error deleting account:', error);
            toast.error(
                error.message || 'Failed to delete account. Please try again.'
            );
        },
    });

    const handleDeleteAccount = async () => {
        if (!user) {
            toast.error('User not authenticated');
            return;
        }
        if (deleteConfirmText !== 'DELETE') {
            toast.error('Please type DELETE to confirm account deletion');
            return;
        }
        deleteAccountMutation.mutate();
    };

    const resetDeleteForm = () => {
        setShowDeleteConfirm(false);
        setDeleteConfirmText('');
    };

    return (
        <Sheet>
            <SheetTrigger>
                <div className='p-2 cursor-pointer hover:rotate-90 transition-transform duration-300'>
                    <Settings size={16} />
                </div>
            </SheetTrigger>
            <SheetContent
                iconname="arrow-left"
                className="p-3 right-2 top-2 bottom-2 fixed outline-none flex flex-col rounded-lg w-[90vw] max-w-md"
            >
                <div className="flex-1 overflow-y-auto">
                    <SheetHeader className="px-6 py-0 pb-4 border-b border-border">
                        <SheetTitle className="text-lg font-semibold">
                            User Settings
                        </SheetTitle>
                        <SheetDescription className="text-sm text-muted-foreground">
                            Manage your account and preferences
                        </SheetDescription>
                    </SheetHeader>

                    <div className="p-6 space-y-6">
                        {/* Profile Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <h3 className="text-base font-medium">
                                    Profile Information
                                </h3>
                            </div>

                            <div className="space-y-3">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="displayName"
                                        className="text-sm"
                                    >
                                        Display Name
                                    </Label>
                                    <Input
                                        id="displayName"
                                        value={displayName}
                                        onChange={(e) =>
                                            setDisplayName(e.target.value)
                                        }
                                        placeholder="Enter your display name"
                                        className="h-9"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm text-muted-foreground">
                                        Email
                                    </Label>
                                    <Input
                                        value={user?.email || ''}
                                        disabled
                                        className="h-9 bg-muted text-muted-foreground"
                                    />
                                </div>

                                <Button
                                    onClick={handleUpdateProfile}
                                    disabled={
                                        isUpdatingProfile ||
                                        !displayName.trim() ||
                                        displayName === user?.displayName
                                    }
                                    size="sm"
                                    className="w-full"
                                >
                                    {isUpdatingProfile
                                        ? 'Updating...'
                                        : 'Update Profile'}
                                </Button>
                            </div>
                        </div>

                        {/* Danger Zone */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <h3 className="text-base font-medium">
                                    Danger Zone
                                </h3>
                            </div>

                            {/* Warning */}
                            <div className="p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                                <p className="text-xs text-destructive/80 mb-2">
                                    <strong>Warning:</strong> This action cannot
                                    be undone.
                                </p>
                                <p className="text-xs text-destructive/70">
                                    Deleting your account will permanently
                                    remove all your data, including URLs,
                                    analytics, and settings.
                                </p>
                            </div>

                            {!showDeleteConfirm ? (
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="w-full"
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Account
                                </Button>
                            ) : (
                                <div className="space-y-3 p-4 border border-destructive/20 rounded-lg bg-card">
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="confirmDelete"
                                            className="text-sm text-foreground"
                                        >
                                            Type{' '}
                                            <span className="font-bold bg-destructive/10 text-destructive px-2 py-1 rounded text-xs">
                                                DELETE
                                            </span>{' '}
                                            to confirm
                                        </Label>
                                        <Input
                                            id="confirmDelete"
                                            value={deleteConfirmText}
                                            onChange={(e) =>
                                                setDeleteConfirmText(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Type DELETE to confirm"
                                            className="h-9 border-destructive/30 focus:border-destructive focus:ring-destructive"
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={resetDeleteForm}
                                            className="flex-1"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={handleDeleteAccount}
                                            disabled={
                                                deleteAccountMutation.isPending ||
                                                deleteConfirmText !== 'DELETE'
                                            }
                                            className="flex-1"
                                        >
                                            {deleteAccountMutation.isPending
                                                ? 'Deleting...'
                                                : 'Delete Forever'}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default UserSettings;
