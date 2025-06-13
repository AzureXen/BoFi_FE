import type { UserProfileFetched } from "./UserProfileFetched";

export default class UserProfileModel {
    id: number;
    name: string;
    email: string;
    full_name: string;
    phone: string;
    address: string;
    avatar: string;
    role: string;

    constructor(
        id: number,
        name: string,
        email: string,
        full_name: string,
        phone: string,
        address: string,
        avatar: string,
        role: string
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.full_name = full_name;
        this.phone = phone;
        this.address = address;
        this.avatar = avatar;
        this.role = role;
    }

    static fromApi(raw: UserProfileFetched): UserProfileModel {
        return new UserProfileModel(
            raw.id,
            raw.username,
            raw.email,
            raw.full_name,
            raw.phone,
            raw.address,
            raw.avatar,
            raw.role
        );
    }
}
