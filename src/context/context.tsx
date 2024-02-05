import React, {
    createContext,
    useState
} from "react";


export interface CommonContextType {
    showList: any[] | undefined;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    setShowList: (item: any) => void;
    updateList: (item: any) => void;
   favoriteList: any[]  | undefined;
}

const CommonContext = createContext<CommonContextType | undefined>(undefined);;


const CommonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [showList, setShowList] = useState<any[] | undefined>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [favoriteList, setFavoriteList] = useState<any[]>([]);

    const updateList = (item: any) => {
        const isFavorite = favoriteList?.some(favorite => favorite.id === item.id);

        if (isFavorite) {
            const updatedFavoriteList = favoriteList.filter(favorite => favorite.id !== item.id);
            setFavoriteList(updatedFavoriteList);
        } else {
            const updatedFavoriteList = [...favoriteList, item];
            setFavoriteList(updatedFavoriteList);
        }

    };

    return (<CommonContext.Provider value={{ showList, setShowList, searchQuery, setSearchQuery, favoriteList, updateList }}>
        {children}
    </CommonContext.Provider>)

};

export { CommonProvider, CommonContext };