import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { Socket } from 'socket.io-client';

type LocalUser = {
    id: string;
    avatar?: string;
    username?: string;
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    otherNames?: string;
    isAdmin: boolean;
    isStaff: boolean;
    isMentor: boolean;
    isStudent: boolean;
    isTutor: boolean;
    isSuperUser: boolean;
};

type CallerInfo = LocalUser & {
    connection: string;
};
type RingPeerResponse = {
    isOnline: boolean;
    isRinging: boolean;
    isOnCall: boolean;
    caller: CallerInfo;
    video: boolean;
    audio: boolean;
    meetingId?: string;
};

type SoundEffectType = {
    title: string;
    sounds: {
        title: string;
        src: string;
    }[];
};
type Sounds = {
    dialtone: string | undefined;
    ringtone: string | undefined;
    timeout: string | undefined;
    notifications: {
        joined: string | undefined;
        joinRequest: string | undefined;
        handRaised: string | undefined;
        messageSent: string | undefined;
        messageReceived: string | undefined;
    };
    effects: SoundEffectType[];
};

interface AwarenessContextValue {
    ringTimeoutSec: number;
    ringPeer: (user: {
        id: string;
        caller: CallerInfo;
        video: boolean;
        audio: boolean;
    }) => Promise<RingPeerResponse>;
    rejectRingPeer: ({ meetingId }: {
        meetingId: string;
    }) => Promise<{
        aborted: boolean;
    }>;
    acceptRingPeer: (meetingId: string) => void;
    getOutgoingCallsRef: (meetingId: string) => NodeJS.Timeout;
    endCall: (meetingId: string) => void;
    emit: (event: string, ...args: any) => void;
    on: (event: string, callback: (...args: any[]) => void) => (() => Socket) | undefined;
    getSocket: () => Socket | null;
    onToast?: (props: {
        type: 'success' | 'info' | 'warning' | 'error';
        message: string;
    }) => void;
}
declare const AwarenessProvider: ({ children, baseURL, endpoints, sounds, config, getToken, getUser, }: {
    children: ReactNode;
    baseURL: string;
    endpoints: {
        online: string;
    };
    sounds: Sounds;
    config?: {
        ringTimeoutSec?: number;
        defaultAvatarSrc?: string;
        onToast?: (props: {
            type: "success" | "info" | "warning" | "error";
            message: string;
        }) => void;
    };
    getToken: () => Promise<string | null>;
    getUser: () => Promise<LocalUser>;
}) => react_jsx_runtime.JSX.Element;
declare const useAwarenessProvider: () => AwarenessContextValue;

declare function withTimeout<T>(promise: Promise<T>, timeoutMs: number, errorMessage?: string): Promise<T>;
declare const extractLocalUserData: (data: any) => LocalUser;

export { AwarenessProvider, extractLocalUserData, useAwarenessProvider, withTimeout };
