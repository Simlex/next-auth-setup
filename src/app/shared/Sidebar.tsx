"use client";
import { ReactElement, FunctionComponent, Dispatch, SetStateAction } from "react";
import styles from "../../styles/Sidebar.module.scss";
import { CaretLeftIcon, CaretRightIcon, CustomersIcon, DashboardIcon, GalleryIcon, LogoutIcon, PaymentsIcon, PricingIcon, WebContentsIcon } from "../components/SVGs/SVGicons";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SidebarProps {
    setIsNavOpen: Dispatch<SetStateAction<boolean>>
    isNavOpen: boolean
}

const Sidebar: FunctionComponent<SidebarProps> = ({ setIsNavOpen, isNavOpen }): ReactElement => {

    const pathname = usePathname();

    return (
        <div className={isNavOpen ? styles.sidebarContainer : styles.miniSidebarContainer}>
            <span
                className={styles.controller}
                onClick={() => setIsNavOpen(!isNavOpen)}>
                {isNavOpen ? <CaretLeftIcon /> : <CaretRightIcon />}
            </span>
            <div className={styles.sidebarItemContainer}>
                <Link href="/"
                    className={`${styles.sidebarItem} ${pathname == '/' ? styles.sidebarItemActive : ''}`}>
                    <span><DashboardIcon /></span>
                    <p>Dashboard</p>
                </Link>
                <Link
                    href="/customers"
                    className={`${styles.sidebarItem} ${pathname == '/customers' ? styles.sidebarItemActive : ''}`}>
                    <span><CustomersIcon /></span>
                    <p>Customers</p>
                </Link>
                <Link
                    href="/payments"
                    className={`${styles.sidebarItem} ${pathname == '/payments' ? styles.sidebarItemActive : ''}`}>
                    <span><PaymentsIcon /></span>
                    <p>Payments</p>
                </Link>
                <Link
                    href="/pricing"
                    className={`${styles.sidebarItem} ${pathname == '/pricing' ? styles.sidebarItemActive : ''}`}>
                    <span><PricingIcon /></span>
                    <p>Pricing</p>
                </Link>
                <Link
                    href="/web-content"
                    className={`${styles.sidebarItem} ${pathname == '/web-content' ? styles.sidebarItemActive : ''}`}>
                    <span><WebContentsIcon /></span>
                    <p>Web Content</p>
                </Link>
                <Link
                    href="/gallery"
                    className={`${styles.sidebarItem} ${pathname == '/gallery' ? styles.sidebarItemActive : ''}`}>
                    <span><GalleryIcon /></span>
                    <p>Gallery</p>
                </Link>
            </div>
            <div className={styles.sidebarItem}>
                <span><LogoutIcon /></span>
                <p>Log out</p>
            </div>
        </div>
    );
}

export default Sidebar;