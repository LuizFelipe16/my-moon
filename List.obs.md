console.log(data);

  // useEffect(() => {
  //   setIsLoadingList(true);
  //   loadingLists();
  // }, [session]);

  // async function loadingLists(): Promise<void> {
  //   setIsLoadingList(true);

  //   await api.get("/lists").then((response) => {
  //     setLists(response.data.data);
  //     setIsLoadingList(false);
  //   }).catch((response) => {
  //     setIsLoadingList(false);
  //     toast({ title: response.data.error, status: "error", duration: 5000 });
  //   });
  // }

  const [lists, setLists] = useState<IListItem[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(false);

  // const handleCreateNewItemList: SubmitHandler<CreateItemListFormData> = async (item) => {
  //   await api.post("/lists", item).then((response) => {
  //     toast({ title: response.data.message, status: "success", duration: 5000 });
  //     // loadingLists();
  //   }).catch((response) => {
  //     toast({ title: "Ocorreu um erro inesperado", status: "error", duration: 5000 });
  //   });
  // };


  async function deleteItem(): Promise<void> {
    setIsLoadingWaitingDeleteItem(true);

    await api.delete(`/itemList/${itemId}`).then((response) => {
      setIsLoadingWaitingDeleteItem(false);
      router.push('/Lists');
      toast({ title: response.data.message, status: "success", duration: 5000 });
    }).catch((response) => {
      toast({ title: response.data.error, status: "error", duration: 5000 });
      setIsLoadingWaitingDeleteItem(false);
    });
  }