import * as React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '../../components/ui/sidebar';
import { TooltipProvider } from '../../components/ui/tooltip';
import { AppSidebar } from '../../components/app-sidebar';
import { Separator } from '../../components/ui/separator';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../../components/ui/breadcrumb';
import type { BreadcrumbItem as BreadcrumbItemType } from '../../types';

export interface AppSidebarLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItemType[];
}

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppSidebarLayoutProps) {
    return (
        <TooltipProvider>
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        {breadcrumbs.length > 0 && (
                            <>
                                <Separator orientation="vertical" className="mr-2 h-4" />
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        {breadcrumbs.map((crumb, index) => {
                                            const isLast = index === breadcrumbs.length - 1;
                                            return (
                                                <React.Fragment key={crumb.href ?? crumb.title}>
                                                    <BreadcrumbItem>
                                                        {isLast || !crumb.href ? (
                                                            <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                                                        ) : (
                                                            <BreadcrumbLink href={crumb.href}>
                                                                {crumb.title}
                                                            </BreadcrumbLink>
                                                        )}
                                                    </BreadcrumbItem>
                                                    {!isLast && <BreadcrumbSeparator />}
                                                </React.Fragment>
                                            );
                                        })}
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </>
                        )}
                    </div>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
        </TooltipProvider>
    );
}
