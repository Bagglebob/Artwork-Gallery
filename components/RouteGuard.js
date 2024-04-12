import { favouritesAtom, searchHistoryAtom } from "@/store";
import { getHistory, getFavourites, setHistory, setFavourites,  setAuthorized } from "@/lib/userData";
import { isAuthenticated } from "@/lib/authenticate";
import { useState, useEffect } from "react";
import {useAtom} from 'jotai';
import { useRouter } from 'next/router';

const PUBLIC_PATHS = ['/login', '/', '/_error', '/register'];


export default function RouteGuard(props) {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [favorites, setFavourites] = useAtom(favouritesAtom);

    // whether or not the user has been authorized
    const [authorized, setAuthorized] = useState(false);

    async function updateAtoms() {
        setSearchHistory(await getHistory());
        setFavourites(await getFavourites());
      }

      const router = useRouter();

      useEffect(() => {
        updateAtoms();
        // on initial load - run auth check
        authCheck(router.pathname);
    
        // on route change complete - run auth check
        router.events.on('routeChangeComplete', authCheck);
    
        // unsubscribe from events in useEffect return function
        return () => {
          router.events.off('routeChangeComplete', authCheck);
        };
      }, []);
    

    function authCheck(url) {
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
            setAuthorized(false);
            router.push('/login');
          } else {
            setAuthorized(true);
          }
      }

    return (<>{authorized && props.children}</>);
  }