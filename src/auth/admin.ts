// mock admin is used from .env
export default function isAdmin(inpEmail: string | null | undefined) {
    return inpEmail === process.env.NEXT_PUBLIC_DB_ADMIN_EMAIL
}

// TODO: set up actual Admin table and refactor mock isAdmin