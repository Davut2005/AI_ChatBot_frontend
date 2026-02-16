/**
 * @file index.ts
 * @description Comprehensive Type Definitions for ChatBot Application
 * This file contains all the interfaces, types, and enums used throughout the application.
 */

// ==========================================
// Base Interfaces
// ==========================================

/**
 * Base interface for all entities with a unique identifier.
 */
export interface Entity {
    id: string;
}

/**
 * Base interface for entities that track creation and modification times.
 */
export interface Timestamps {
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
    deletedAt?: string | null; // ISO 8601 date string, null if active
}

/**
 * Combined base interface for standard database entities.
 */
export interface BaseEntity extends Entity, Timestamps { }

// ==========================================
// User & Authentication Types
// ==========================================





/**
 * User Preferences Interface
 */
export interface UserPreferences {
    language: string;
    region: string;
    timezone: string;
    use24HourFormat: boolean;
    enableSoundEffects: boolean;
    enableHapticFeedback: boolean;
    autoPlayMedia: boolean;
}

/**
 * User Profile Interface
 */
export interface UserProfile extends BaseEntity {
    userId: string;
    firstName: string;
    lastName: string;
    displayName?: string;
    avatarUrl?: string;
    bannerUrl?: string;
    bio?: string;
    dateOfBirth?: string;
    location?: string;
    website?: string;
    socialLinks?: {
        twitter?: string;
        facebook?: string;
        instagram?: string;
        linkedin?: string;
        github?: string;
    };
}


// ==========================================
// Settings Types
// ==========================================


/**
 * Application Theme Settings
 */


/**
 * Notification Settings
 */
export interface NotificationSettings {
    emailNotifications: boolean;
    pushNotifications: boolean;
    smsNotifications: boolean;
    desktopNotifications: boolean;
    soundEnabled: boolean;
    notifyOnNewMessage: boolean;
    notifyOnMention: boolean;
    notifyOnFriendRequest: boolean;
    notifyOnSystemUpdate: boolean;
    quietHoursEnabled: boolean;
    quietHoursStart?: string; // HH:mm
    quietHoursEnd?: string; // HH:mm
}

/**
 * Privacy Settings
 */
export interface PrivacySettings {
    profileVisibility: 'public' | 'friends' | 'private';
    statusVisibility: 'public' | 'friends' | 'private';
    showLastSeen: boolean;
    showReadReceipts: boolean;
    allowFriendRequests: boolean;
    blockList: string[]; // List of User IDs
}



// ==========================================
// Chat & Messaging Types
// ==========================================



/**
 * Reaction Interface
 */
export interface Reaction {
    emoji: string;
    userId: string;
    timestamp: string;
}


export interface Participant {
    userId: string;
    joinedAt: string;
    role: 'member' | 'admin' | 'owner';
    lastReadMessageId?: string;
    notificationsEnabled: boolean;
    isTyping?: boolean; // Ephemeral state
}




// ==========================================
// API Response Types
// ==========================================

export interface PaginationMeta {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    meta?: PaginationMeta;
    timestamp: string;
}

export interface ApiErrorResponse {
    success: false;
    error: {
        code: string;
        message: string;
        details?: any;
        stack?: string; // Only in dev mode
    };
    timestamp: string;
}




