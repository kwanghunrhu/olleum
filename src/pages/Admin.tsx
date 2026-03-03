// ... 상단 생략 (기존과 동일) ...

  const handleSave = async () => {
    setIsSaving(true);
    
    // 대표 사진(imageUrl)이 비어있는데 갤러리 사진이 있다면, 첫 번째 사진을 대표 사진으로 설정
    const finalFormData = { ...formData };
    if (!finalFormData.imageUrl && finalFormData.images && finalFormData.images.length > 0) {
      finalFormData.imageUrl = finalFormData.images[0];
    }

    try {
      if (editingId) {
        await updateProject(editingId, finalFormData);
        setEditingId(null);
      } else {
        await addProject(finalFormData);
        setIsAdding(false);
      }
      // ... 초기화 및 성공 처리 ...
