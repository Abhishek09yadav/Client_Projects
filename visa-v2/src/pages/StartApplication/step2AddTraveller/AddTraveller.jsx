import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';



export default function CenteredTabs() {
    const [tabvalue, settabvalue] = React.useState(0);
    const [tabs, setTabs] = React.useState(['Passanger 1', 'Passanger 2', 'Passanger 3']);

    const handleChange = (event, newValue) => {
        settabvalue(newValue);
    };

    const handleAddTab = () => {
        setTabs([...tabs, `Passanger ${tabs.length + 1}`]);
        settabvalue(tabs.length); // Select the new tab
    };

    const handleDeleteTab = (index) => {
        const newTabs = tabs.filter((tab, i) => i !== index);
        setTabs(newTabs);
        settabvalue((prevValue) => (prevValue === index ? 0 : prevValue > index ? prevValue - 1 : prevValue));
    };

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={tabvalue} onChange={handleChange} centered>
                {tabs.map((tab, index) => (
                    <Tab
                        key={index}
                        label={
                            <Box display="flex" alignItems="center">
                                {tab}
                                <IconButton
                                    size="small"
                                    onClick={() => handleDeleteTab(index)}
                                    sx={{ marginLeft: 1 }}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        }
                    />
                ))}
                <IconButton onClick={handleAddTab} sx={{ marginLeft: 1 }}>
                    <AddIcon />
                </IconButton>
            </Tabs>
        </Box>
    );
}
